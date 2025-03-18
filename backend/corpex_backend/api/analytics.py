from django.db.models import Sum, Count, Avg, F, Q
from django.db.models.functions import TruncMonth, TruncWeek, ExtractMonth
from datetime import datetime, timedelta
from .models import Expense, Payment
import json

def get_expense_summary(user):
    """Get summary statistics for a user's expenses"""
    total_expenses = Expense.objects.filter(user=user).count()
    total_amount = Expense.objects.filter(user=user).aggregate(total=Sum('amount'))['total'] or 0
    pending_amount = Expense.objects.filter(user=user, status='Pending').aggregate(total=Sum('amount'))['total'] or 0
    approved_amount = Expense.objects.filter(user=user, status='Approved').aggregate(total=Sum('amount'))['total'] or 0
    rejected_amount = Expense.objects.filter(user=user, status='Rejected').aggregate(total=Sum('amount'))['total'] or 0
    
    return {
        'total_expenses': total_expenses,
        'total_amount': float(total_amount),
        'pending_amount': float(pending_amount),
        'approved_amount': float(approved_amount),
        'rejected_amount': float(rejected_amount),
    }

def get_expense_by_category(user):
    """Get expense breakdown by category"""
    categories = Expense.objects.filter(user=user).values('category').annotate(
        count=Count('id'),
        total=Sum('amount')
    ).order_by('category')
    
    return list(categories)

def get_expense_by_status(user):
    """Get expense breakdown by status"""
    statuses = Expense.objects.filter(user=user).values('status').annotate(
        count=Count('id'),
        total=Sum('amount')
    ).order_by('status')
    
    return list(statuses)

def get_monthly_expenses(user):
    """Get monthly expense trends"""
    # Get data for the last 6 months
    six_months_ago = datetime.now().date() - timedelta(days=180)
    
    monthly_expenses = Expense.objects.filter(
        user=user,
        date__gte=six_months_ago
    ).annotate(
        month=TruncMonth('date')
    ).values('month').annotate(
        count=Count('id'),
        total=Sum('amount')
    ).order_by('month')
    
    # Convert to list and format dates
    result = []
    for item in monthly_expenses:
        result.append({
            'month': item['month'].strftime('%Y-%m'),
            'month_name': item['month'].strftime('%b %Y'),
            'count': item['count'],
            'total': float(item['total'])
        })
    
    return result

def get_category_trends(user):
    """Get category trends over time"""
    # Get data for the last 6 months
    six_months_ago = datetime.now().date() - timedelta(days=180)
    
    category_trends = Expense.objects.filter(
        user=user,
        date__gte=six_months_ago
    ).annotate(
        month=TruncMonth('date')
    ).values('month', 'category').annotate(
        total=Sum('amount')
    ).order_by('month', 'category')
    
    # Convert to list and format dates
    result = []
    for item in category_trends:
        result.append({
            'month': item['month'].strftime('%Y-%m'),
            'month_name': item['month'].strftime('%b %Y'),
            'category': item['category'],
            'total': float(item['total'])
        })
    
    return result

def get_payment_statistics(user):
    """Get payment statistics"""
    total_payments = Payment.objects.filter(expense__user=user).count()
    total_paid = Payment.objects.filter(expense__user=user, status='Completed').aggregate(
        total=Sum('amount')
    )['total'] or 0
    
    payment_methods = Payment.objects.filter(expense__user=user).values('payment_method').annotate(
        count=Count('id'),
        total=Sum('amount')
    ).order_by('payment_method')
    
    payment_statuses = Payment.objects.filter(expense__user=user).values('status').annotate(
        count=Count('id'),
        total=Sum('amount')
    ).order_by('status')
    
    return {
        'total_payments': total_payments,
        'total_paid': float(total_paid),
        'payment_methods': list(payment_methods),
        'payment_statuses': list(payment_statuses)
    }

def get_all_analytics(user):
    """Get all analytics data for a user"""
    return {
        'expense_summary': get_expense_summary(user),
        'expense_by_category': get_expense_by_category(user),
        'expense_by_status': get_expense_by_status(user),
        'monthly_expenses': get_monthly_expenses(user),
        'category_trends': get_category_trends(user),
        'payment_statistics': get_payment_statistics(user)
    }
