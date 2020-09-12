# Generated by Django 3.1 on 2020-09-12 06:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('eventapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('time', models.CharField(choices=[('Morning', 'Morning'), ('Afternoon', 'Afternoon'), ('Evening', 'Evening')], max_length=30)),
                ('location', models.CharField(max_length=100)),
                ('room_capacity', models.CharField(max_length=50)),
                ('speaker', models.CharField(max_length=50)),
                ('tagline', models.CharField(max_length=100)),
            ],
        ),
    ]