import random
from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from corpex_backend.api.models import Expense, Payment

class Command(BaseCommand):
    help = 'Creates demo users and expense data for the CORPEX application'

    def handle(self, *args, **kwargs):
        self.stdout.write('Creating demo data...')
        
        # Create demo users if they don't exist
        users = self.create_users()
        
        # Create expenses for each user
        for user in users:
            self.create_expenses(user)
            
        self.stdout.write(self.style.SUCCESS('Successfully created demo data!'))
    
    def create_users(self):
        """Create demo users if they don't exist"""
        users = []
        
        demo_users = [
            {'username': 'john', 'email': 'john@example.com', 'first_name': 'John', 'last_name': 'Doe', 'password': 'password123'},
            {'username': 'jane', 'email': 'jane@example.com', 'first_name': 'Jane', 'last_name': 'Smith', 'password': 'password123'},
            {'username': 'mike', 'email': 'mike@example.com', 'first_name': 'Mike', 'last_name': 'Johnson', 'password': 'password123'},
            {'username': 'sarah', 'email': 'sarah@example.com', 'first_name': 'Sarah', 'last_name': 'Williams', 'password': 'password123'},
        ]
        
        for user_data in demo_users:
            user, created = User.objects.get_or_create(
                username=user_data['username'],
                defaults={
                    'email': user_data['email'],
                    'first_name': user_data['first_name'],
                    'last_name': user_data['last_name'],
                }
            )
            
            if created:
                user.set_password(user_data['password'])
                user.save()
                self.stdout.write(f"Created user: {user.username}")
            else:
                self.stdout.write(f"User already exists: {user.username}")
                
            users.append(user)
            
        return users
    
    def create_expenses(self, user):
        """Create random expenses for a user"""
        # Delete existing expenses for this user to avoid duplicates
        Expense.objects.filter(user=user).delete()
        
        # Merchants
        merchants = [
            'Uber', 'Lyft', 'Amazon', 'Office Depot', 'Staples', 
            'Apple Store', 'Best Buy', 'Dell', 'Microsoft Store',
            'Hilton Hotel', 'Marriott', 'Airbnb', 'Southwest Airlines',
            'Delta Airlines', 'Kenya Airways', 'Starbucks', 'Subway',
            'McDonalds', 'KFC', 'Pizza Hut', 'Safaricom', 'Airtel'
        ]
        
        # Create between 15-30 expenses per user
        num_expenses = random.randint(15, 30)
        
        # Create expenses over the last 6 months
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=180)
        
        expenses_created = 0
        
        for _ in range(num_expenses):
            # Generate random date within the last 6 months
            days_diff = (end_date - start_date).days
            random_days = random.randint(0, days_diff)
            expense_date = start_date + timedelta(days=random_days)
            
            # Generate random category
            category = random.choice([choice[0] for choice in Expense.CATEGORY_CHOICES])
            
            # Generate random merchant based on category
            merchant = random.choice(merchants)
            
            # Generate random amount based on category
            if category == 'Travel':
                amount = round(random.uniform(100, 1000), 2)
            elif category == 'Meals':
                amount = round(random.uniform(10, 100), 2)
            elif category == 'Office Supplies':
                amount = round(random.uniform(5, 200), 2)
            elif category == 'Technology':
                amount = round(random.uniform(50, 2000), 2)
            else:  # Other
                amount = round(random.uniform(10, 500), 2)
            
            # Generate random description
            descriptions = {
                'Travel': [
                    f'Business trip to {random.choice(["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"])}',
                    f'Conference in {random.choice(["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"])}',
                    'Client meeting transportation',
                    'Airport transfer',
                    'Taxi fare for business meeting'
                ],
                'Meals': [
                    'Business lunch with client',
                    'Team dinner',
                    'Breakfast during business trip',
                    'Coffee with potential partner',
                    'Catering for office meeting'
                ],
                'Office Supplies': [
                    'Printer paper and ink',
                    'Notebooks and pens',
                    'Office stationery',
                    'Desk organizers',
                    'Whiteboard supplies'
                ],
                'Technology': [
                    'New laptop for work',
                    'Software subscription',
                    'Mobile phone for work',
                    'Computer accessories',
                    'Office equipment repair'
                ],
                'Other': [
                    'Miscellaneous office expenses',
                    'Team building activity',
                    'Professional development course',
                    'Office decoration',
                    'Subscription service'
                ]
            }
            
            description = random.choice(descriptions[category])
            
            # Generate random status with weighted probability
            status_choices = ['Pending', 'Approved', 'Rejected']
            status_weights = [0.3, 0.6, 0.1]  # 30% pending, 60% approved, 10% rejected
            status = random.choices(status_choices, status_weights)[0]
            
            # Create the expense
            expense = Expense.objects.create(
                user=user,
                merchant=merchant,
                amount=amount,
                date=expense_date,
                category=category,
                description=description,
                status=status
            )
            
            # Create payment for approved expenses
            if status == 'Approved':
                # 80% chance of having a payment
                if random.random() < 0.8:
                    reference = f'PAY-{random.randint(100000, 999999)}'
                    payment_status = random.choice(['Pending', 'Completed'])
                    
                    Payment.objects.create(
                        expense=expense,
                        amount=expense.amount,
                        reference=reference,
                        status=payment_status,
                        payment_method=random.choice(['Mpesa', 'Bank Transfer', 'Credit Card'])
                    )
            
            expenses_created += 1
            
        self.stdout.write(f"Created {expenses_created} expenses for user: {user.username}")
