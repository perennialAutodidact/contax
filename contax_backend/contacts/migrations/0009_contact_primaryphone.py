# Generated by Django 3.2.5 on 2021-08-02 18:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0008_alter_contact_notes'),
    ]

    operations = [
        migrations.AddField(
            model_name='contact',
            name='primaryPhone',
            field=models.CharField(choices=[('CELL', 'Cell'), ('HOME', 'Home'), ('WORK', 'Work')], default='cell', max_length=4),
            preserve_default=False,
        ),
    ]