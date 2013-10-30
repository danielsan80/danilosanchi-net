<?php

namespace Dan\MainBundle\Entity;

use Doctrine\ORM\EntityRepository;

/**
 * GameRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class GameRepository extends EntityRepository
{
    public function findAll()
    {
        $qb = $this->createQueryBuilder('g')
                ->orderBy('g.name','asc');
        return $qb->getQuery()->getResult();
    }
    
    public function findDesired()
    {
        $qb = $this->createQueryBuilder('g')
                ->join('g.desires', 'd')
                ->orderBy('d.createdAt','asc');
        return $qb->getQuery()->getResult();
    }
}
