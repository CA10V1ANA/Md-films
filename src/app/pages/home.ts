import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { siteConfig } from '../data/site.config';
import { projects } from '../data/projects';
import { ProjectCard } from '../shared/project-card';
@Component({
  selector: 'app-home',
  imports: [RouterLink, ProjectCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  config = siteConfig;
  projects = projects;
}
