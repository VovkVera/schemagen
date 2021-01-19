from django.contrib import admin

from .models import User, Field, Schema

admin.site.register(User)
#admin.site.register(Field)
#admin.site.register(Schema)

class FieldInline(admin.TabularInline):
    model = Field

class SchemaAdmin(admin.ModelAdmin):
    fields = (
        'user',
        'name',
    )
    inlines = [
        FieldInline,
    ]

admin.site.register(Schema, SchemaAdmin)