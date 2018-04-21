# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=100)),
                ('start_date', models.DateField(default=django.utils.timezone.now)),
                ('expire_date', models.DateField(default=django.utils.timezone.now)),
                ('priority', models.IntegerField(default=0)),
                ('content', models.TextField()),
                ('status', models.BooleanField(default=False)),
            ],
        ),
    ]
