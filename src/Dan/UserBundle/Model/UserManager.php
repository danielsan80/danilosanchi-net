<?php
namespace Dan\UserBundle\Model;

use FOS\UserBundle\Doctrine\UserManager as BaseUserManager;

use Dan\UserBundle\Entity\User;
use Symfony\Component\HttpKernel\KernelInterface;

class UserManager extends BaseUserManager
{
    private $kernel;
    
    private $imagesDir = '/files/images/users';

    public function setKernel(KernelInterface $kernel)
    {
        $this->kernel = $kernel;
    }
    
    public function getImagesDir()
    {
        return $this->kernel->getRootDir().$this->imagesDir;
    }
    
    public function setUserImage(User $user, $image) {
        $pi = pathinfo($image);
        $filename = 'user_'.md5($user->getEmail()).'.'.$pi['extension'];
        file_put_contents($this->getImagesDir().'/'.$filename, file_get_contents($image));
        $user->setImage($filename);
    }
    
}