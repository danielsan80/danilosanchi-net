<?php

namespace Dan\MainBundle\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Yaml\Yaml;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

use Doctrine\Common\Collections\ArrayCollection;

use Dan\CommonBundle\Controller\Controller;
use Dan\MainBundle\Entity\Event;

/**
 * Widget controller.
 *
 * @Route("/widget")
 */
class WidgetController extends Controller
{
    
    
    
    /**
     * Rss feeds
     * 
     * Route("/google_calendar", name="widget_google_calendar" )
     * @Template 
     */
    public function googleCalendarAction()
    {
        return array();
    }
    
    /**
     * Google Calendar
     * 
     * @Route("/google_calendar/get", name="widget_google_calendar_get" )
     * @Template 
     */
    public function googleCalendarGetAction()
    {
        $key = 'AIzaSyAs3Q6YI5Ptsu4obavUGXAh_9Muq2O7oLU';
        $id = '74ojsha6ov45h3nrrses5bp548@group.calendar.google.com';
        
        $client = new \Guzzle\Http\Client();
        $client->setBaseUrl('https://www.googleapis.com/calendar/v3');
        $request = $client->get('calendars/'.$id.'/events');
        $query = $request->getQuery();
        $start = new \DateTime('-4 weeks');
        $query->set('key', $key);
        $query->set('timeMin', $start->format('Y-m-d\TH:i:s.000P'));
        $query->set('orderBy', 'startTime');
        $query->set('singleEvents', 'true');
        $query->set('maxResults', 20);
        $response = $request->send();
        $calendar = json_decode($response->getBody(true));
        $items = isset($calendar->items)?$calendar->items:array();
        
        $events = array();
        foreach ($items as $i => $item) {
            $events[] = new Event($item);
        }

        
        return array(
            'events' => $events,
        );
    }
    
    /**
     * Rss feeds
     * 
     * Route("/rss_feeds", name="widget_rss_feeds")
     * @Template 
     */
    public function rssFeedsAction()
    {
        return array();
    }
 
    /**
     * Jobs widget
     * 
     * Route("/jobs", name="widget_jobs")
     * @Template 
     */
    public function jobsAction()
    {
        return array();
    }
    
    /**
     * Skills widget
     * 
     * Route("/skills", name="widget_skills")
     * @Template 
     */
    public function skillsAction()
    {
        return array();
    }
    
    /**
     * @Route("/skills/data", name="widget_skills_data")
     */
    public function skillsDataAction()
    {
        $data = file_get_contents($this->get('kernel')->getRootDir().'/data/skills.json');
        return new Response($data, 200, array('Content-Type' => 'application/json'));
    }
    
    /**
     * @Route("/jobs/data", name="widget_jobs_data")
     */
    public function jobsDataAction()
    {
        $data = file_get_contents($this->get('kernel')->getRootDir().'/data/jobs.yml');
        $data = Yaml::parse($data);
        foreach($data as $i => $block) {
            foreach($block['values'] as $j => $value) {
                if (isset($block['desc'])) {
                    $desc = '';
                    if (isset($value['desc'])) {
                        $desc = '<br/><em style="font-size: 9px;" >'.$value['desc'].'</em>';
                    }
                    $value['desc'] = $block['desc'].$desc;
                }
                $from = new \DateTime($value['from']);
                $value['from'] = '/Date('. $from->getTimestamp() . '000)/';
                $to = new \DateTime($value['to']);
                $value['to'] = '/Date('. $to->getTimestamp() . '000)/';
                $block['values'][$j] = $value;
                $value['customClass'] = 'gantt'.$value['color'];
                unset($value['color']);
                $block['values'][$j] = $value;
            }
            $block['desc'] = ' ';
            $data[$i] = $block;
        }
        $data = json_encode($data);
        $data = strtr($data, array('\\/' => '/'));
        return new Response($data, 200, array('Content-Type' => 'application/json'));
    }
 
}
