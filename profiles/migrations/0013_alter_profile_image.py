# Generated by Django 3.2.21 on 2023-10-03 10:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0012_alter_profile_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='image',
            field=models.ImageField(default='https://res.cloudinary.com/dko5fxoa0/image/upload/v1693907273/samples/default_profile_jr1ppf.jpg', upload_to='images/'),
        ),
    ]
