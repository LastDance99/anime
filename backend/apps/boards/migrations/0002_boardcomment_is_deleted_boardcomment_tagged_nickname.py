# Generated by Django 5.2 on 2025-06-03 19:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('boards', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='boardcomment',
            name='is_deleted',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='boardcomment',
            name='tagged_nickname',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
