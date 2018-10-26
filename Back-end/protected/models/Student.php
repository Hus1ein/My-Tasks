<?php
/**
 * Created by PhpStorm.
 * User: hussain
 * Date: 10/7/18
 * Time: 10:29 PM
 */

class Student extends EMongoDocument{

    public $name;

    public $location;

    function collectionName(){
        return 'student';
    }

    public static function model($className=__CLASS__){
        return parent::model($className);
    }
}