from django.db.models import Q
from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.models import User
from .models import Expense, Payment
from .serializers import ExpenseSerializer, PaymentSerializer, UserSerializer
from .analytics import get_expense_summary, get_expense_by_category, get_expense_by_status, \
    get_monthly_expenses, get_category_trends, get_payment_statistics, get_all_analytics
import csv
from django.http import HttpResponse

class ExpenseViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'category']
    search_fields = ['merchant', 'description']
    ordering_fields = ['date', 'amount', 'created_at']
    ordering = ['-date']

    def get_queryset(self):
        queryset = Expense.objects.filter(user=self.request.user)
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(merchant__icontains=search) |
                Q(description__icontains=search)
            )
        return queryset

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        """Approve an expense"""
        expense = self.get_object()
        expense.status = 'Approved'
        expense.save()
        return Response({'status': 'approved'})

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        """Reject an expense"""
        expense = self.get_object()
        expense.status = 'Rejected'
        expense.save()
        return Response({'status': 'rejected'})

    @action(detail=False, methods=['get'])
    def export(self, request):
        """Export expenses to CSV"""
        queryset = self.filter_queryset(self.get_queryset())
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="expenses.csv"'
        
        writer = csv.writer(response)
        writer.writerow(['Merchant', 'Amount', 'Date', 'Category', 'Description', 'Status', 'Created At'])
        
        for expense in queryset:
            writer.writerow([
                expense.merchant,
                expense.amount,
                expense.date,
                expense.category,
                expense.description,
                expense.status,
                expense.created_at
            ])
        
        return response

    @action(detail=True, methods=['post'])
    def process_payment(self, request, pk=None):
        """Process payment for an expense"""
        expense = self.get_object()
        
        # Validate payment data
        reference = request.data.get('reference')
        if not reference:
            return Response({'error': 'Reference is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if payment already exists
        if hasattr(expense, 'payment'):
            return Response({'error': 'Payment already exists for this expense'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Create payment
        payment_data = {
            'expense': expense.id,
            'amount': expense.amount,
            'reference': reference,
            'status': 'Completed',
            'payment_method': 'Mpesa'
        }
        
        serializer = PaymentSerializer(data=payment_data)
        if serializer.is_valid():
            payment = serializer.save()
            expense.status = 'Approved'
            expense.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PaymentViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Payment.objects.filter(expense__user=self.request.user)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Users can only see their own profile
        return User.objects.filter(id=self.request.user.id)


class AnalyticsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        """Get all analytics data for the current user"""
        analytics_data = get_all_analytics(request.user)
        return Response(analytics_data)


class ExpenseSummaryView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        """Get expense summary for the current user"""
        summary = get_expense_summary(request.user)
        return Response(summary)


class ExpenseByCategoryView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        """Get expense breakdown by category for the current user"""
        by_category = get_expense_by_category(request.user)
        return Response(by_category)


class ExpenseByStatusView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        """Get expense breakdown by status for the current user"""
        by_status = get_expense_by_status(request.user)
        return Response(by_status)


class MonthlyExpensesView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        """Get monthly expense trends for the current user"""
        monthly = get_monthly_expenses(request.user)
        return Response(monthly)


class CategoryTrendsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        """Get category trends over time for the current user"""
        trends = get_category_trends(request.user)
        return Response(trends)


class PaymentStatisticsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        """Get payment statistics for the current user"""
        statistics = get_payment_statistics(request.user)
        return Response(statistics)