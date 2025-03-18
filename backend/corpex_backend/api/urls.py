from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ExpenseViewSet, PaymentViewSet, UserViewSet,
    AnalyticsView, ExpenseSummaryView, ExpenseByCategoryView, ExpenseByStatusView,
    MonthlyExpensesView, CategoryTrendsView, PaymentStatisticsView
)

router = DefaultRouter()
router.register(r'expenses', ExpenseViewSet, basename='expense')
router.register(r'payments', PaymentViewSet, basename='payment')
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
    # Analytics endpoints
    path('analytics/', AnalyticsView.as_view(), name='analytics'),
    path('analytics/expense-summary/', ExpenseSummaryView.as_view(), name='expense-summary'),
    path('analytics/expense-by-category/', ExpenseByCategoryView.as_view(), name='expense-by-category'),
    path('analytics/expense-by-status/', ExpenseByStatusView.as_view(), name='expense-by-status'),
    path('analytics/monthly-expenses/', MonthlyExpensesView.as_view(), name='monthly-expenses'),
    path('analytics/category-trends/', CategoryTrendsView.as_view(), name='category-trends'),
    path('analytics/payment-statistics/', PaymentStatisticsView.as_view(), name='payment-statistics'),
]