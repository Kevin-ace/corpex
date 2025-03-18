from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Expense, Payment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'amount', 'reference', 'status', 'payment_method', 'created_at']
        read_only_fields = ['id', 'created_at']

class ExpenseSerializer(serializers.ModelSerializer):
    payment = PaymentSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Expense
        fields = ['id', 'user', 'merchant', 'amount', 'date', 'category', 'description',
                'status', 'receipt', 'payment', 'created_at', 'updated_at']
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)