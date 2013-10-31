<?php

namespace Dan\MainBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\Console\Application;
use Symfony\Component\Console\Tester\CommandTester;
use Symfony\Component\Console\Input\ArgvInput;
use Symfony\Component\Console\Output\ConsoleOutput;

use Dan\CommonBundle\Controller\Controller;

/**
 * Default controller.
 * 
 * @Route("")
 */
class DefaultController extends Controller
{
    
    /**
     * Home page
     * 
     * @Route("/", name="home")
     * @Template
     */
    public function homeAction()
    {
        return array();
    }
    
    /**
     * Bridge to view blog feed
     * @return \Symfony\Component\HttpFoundation\Response
     * @Route("/feed/blog", name="feed_blog")
     */
    public function feedBlogAction()
    {
        $feed = file_get_contents('http://blog.danilosanchi.net/feed/');

        $response = new Response($feed,200, array(
            'Content-Type' => 'application/xml'
        ));
        return $response;
    }

}
