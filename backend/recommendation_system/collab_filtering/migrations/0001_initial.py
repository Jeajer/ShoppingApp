# Generated by Django 4.2.7 on 2024-01-08 09:42

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Collab_filtering',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.CharField(max_length=200)),
                ('item', models.CharField(max_length=200)),
                ('recommendation', models.JSONField()),
            ],
        ),
    ]
