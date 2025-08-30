import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import Card, { CardHeader, CardTitle, CardContent } from './UI/Card';

const PROJECTS = [
  {
    name: 'Wunder Coaching',
    url: 'https://wundercoaching.com.ar',
    description: 'Sitio web profesional para coaching y desarrollo personal.',
  },
  {
    name: 'Marketing MLB',
    url: 'https://marketingmlb.com.ar',
    description: 'Agencia de marketing digital y soluciones web.',
  },
  {
    name: 'Capacitaciones MLB',
    url: 'https://navajowhite-bat-858967.hostingersite.com',
    description: 'Plataforma de capacitaciones y cursos especializados.',
  },
  {
    name: 'Tienda de Juegos',
    url: 'https://github.com/IJSagnella/TP1_PaginaWeb',
    description: 'E-commerce de videojuegos desarrollado como proyecto académico.',
    isGitHub: true,
  },
];

const PORTFOLIO_ANIMATIONS = {
  container: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  },
};

const Portfolio = () => (
  <motion.section
    id="portfolio"
    className="py-20 relative"
    variants={PORTFOLIO_ANIMATIONS.container}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    aria-label="Ejemplos de proyectos realizados"
  >
    <div className="container mx-auto px-4">
      <Card variant="glass" padding="lg" animation="hover">
        <CardHeader>
          <CardTitle level={2} color="text-neon-blue">
            Portafolio de Proyectos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {PROJECTS.map((project) => (
              <div key={project.url || project.name} className={`p-6 rounded-xl bg-dark-bg border shadow-md flex flex-col gap-2 border-dark-border`}>
                <span className="font-bold text-lg text-neon-blue flex items-center gap-2">
                  {project.name}
                  <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Ver ${project.name}`} className="ml-2 text-dark-text/60 hover:text-neon-blue">
                    {project.isGitHub ? <FaGithub /> : <FaExternalLinkAlt />}
                  </a>
                </span>
                <span className="text-dark-text/70 text-sm">{project.description}</span>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <span className="font-bold text-dark-text">Proyectos de Software en GitHub:</span>
            <a
              href="https://github.com/EXCOff"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 ml-2 px-4 py-2 bg-neon-blue/20 text-neon-blue rounded-full hover:bg-neon-blue/40 transition-colors"
              aria-label="Ver portafolio en GitHub"
            >
              <FaGithub />
              Ver GitHub
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  </motion.section>
);

export default Portfolio;
