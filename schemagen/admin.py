from django.contrib import admin

from .models import User, Field, Type, Schema, Schema_Field

admin.site.register(User)
admin.site.register(Type)
admin.site.register(Field)
admin.site.register(Schema)
admin.site.register(Schema_Field)