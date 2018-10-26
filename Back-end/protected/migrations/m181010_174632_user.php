<?php

class m181010_174632_user extends CDbMigration
{
	public function up()
	{
        $this->createTable('user', array(
            'id' => 'int(11) auto_increment PRIMARY KEY',
            "status" => "int default 0", // -1 disabled, 0 - guest, 1 - waiting for email confirmation, 2-confirmed user

            "email" => "string NULL",
            "password" => "string NULL",
            "password_hash" => "string NULL",

            "firstname" => "string NULL",
            "lastname" => "string NULL",

            "about" => "text NULL",
            "location" => "string NULL",
            "created" => "timestamp NULL",
        ));

        return true;
	}

	public function down()
	{
		echo "m181010_174632_user does not support migration down.\n";
		return false;
	}

	/*
	// Use safeUp/safeDown to do migration with transaction
	public function safeUp()
	{
	}

	public function safeDown()
	{
	}
	*/
}