from django.db import models
from django.utils import timezone


# Create your models here.
class Todo(models.Model):

    title = models.CharField(max_length=100)
    start_date = models.DateField(default=timezone.now)
    expire_date = models.DateField(default=timezone.now)
    priority = models.IntegerField(default=0)
    content = models.TextField()
    status = models.BooleanField(default=False, blank=True)
    
    def __unicode__(self):
        return self.title
