# Generated by Django 4.2.5 on 2024-01-16 10:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0008_alter_user_profile_pic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_pic',
            field=models.TextField(blank=True, null=True),
        ),
    ]
