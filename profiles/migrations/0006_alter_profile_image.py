# Generated by Django 3.2.21 on 2023-10-03 07:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0005_alter_profile_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='image',
            field=models.ImageField(default='https://res.cloudinary.com/dko5fxoa0/image/upload/v1696276538/default_profile_vtdqai.jpg', upload_to='images/'),
        ),
    ]
