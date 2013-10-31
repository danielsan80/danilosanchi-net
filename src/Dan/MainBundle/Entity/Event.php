<?php

namespace Dan\MainBundle\Entity;
use Symfony\Component\Yaml\Yaml;

class Event
{
    private $id;
    private $startDate;
    private $endDate;
    private $name;
    private $description;
    private $location;
    private $url;
    private $confirmed = true;
    private $attended = false;
    
    public function __construct($item=null) {
        if ($item) {
            $this->setId($item->id);
            $this->setName($item->summary);
            if (isset($item->start->date)) {
                $this->setStartDate(new \DateTime($item->start->date));
            }
            if (isset($item->start->dateTime)) {
                $this->setStartDate(new \DateTime($item->start->dateTime));
            }
            if (isset($item->end->date)) {
                $this->setEndDate(new \DateTime($item->end->date));
            }
            if (isset($item->end->dateTime)) {
                $this->setEndDate(new \DateTime($item->end->dateTime));
            }
            if (isset($item->location)) {
                $this->setLocation($item->location);
            }
            if (isset($item->description)) {
                $data = Yaml::parse($item->description);
                if (!$data) {
                    $this->setDescription($item->description);
                } else {
                    if (isset($data['description'])) {
                        $this->setDescription($data['description']);
                    }
                    if (isset($data['url'])) {
                        $this->setUrl($data['url']);
                    }
                    if (isset($data['confirmed'])) {
                        $this->setConfirmed($data['confirmed']);
                    }
                    if (isset($data['attended'])) {
                        $this->setAttended($data['attended']);
                    }
                } 
            }
        }
    }
    
    public function setId($id)
    {
        $this->id = $id;
    }
    
    public function getId()
    {
        return $this->id;
    }
    
    public function setStartDate($date)
    {
        $this->startDate = $date;
    }
    
    public function getStartDate()
    {
        return $this->startDate;
    }
    
    public function setEndDate($date)
    {
        $this->endDate = $date;
    }
    
    public function getEndDate()
    {
        return $this->endDate;
    }
    
    public function setName($name)
    {
        $this->name = trim($name);
    }
    
    public function getName()
    {
        return $this->name;
    }
    
    public function setDescription($description)
    {
        $this->description = trim($description);
    }
    
    public function getDescription()
    {
        return $this->description;
    }
    
    public function setLocation($location)
    {
        $this->location = trim($location);
    }
    
    public function getLocation()
    {
        return $this->location;
    }
    
    public function setUrl($url)
    {
        $this->url = trim($url);
    }
    
    public function getUrl()
    {
        return $this->url;
    }
    
    public function setConfirmed($confirmed = true)
    {
        $this->confirmed = $confirmed;
    }
    
    public function getConfirmed()
    {
        return $this->confirmed;
    }
    
    public function setAttended($attended = true)
    {
        $this->attended = $attended;
    }
    
    public function getAttended()
    {
        return $this->attended;
    }
    
    public function isMultiDays() {
        if ($this->endDate->format('His')=='000000') {
            $startDate = clone $this->startDate;
            $startDate->modify('+1 day');
            if ( $startDate->format('Y-m-d H:i:s') >= $this->endDate->format('Y-m-d H:i:s')) {
                return false;
            }
        }
        return true;
    }
    
}