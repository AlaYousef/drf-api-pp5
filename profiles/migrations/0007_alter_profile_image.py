# Generated by Django 3.2.21 on 2023-10-03 07:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0006_alter_profile_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='image',
            field=models.ImageField(default='default_profile_jr1ppf', upload_to='images/'),
        ),
    ]
