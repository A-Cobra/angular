import { Component, Input } from '@angular/core';
import { Repository } from '../../models/repository.type';
import { defaultRepository } from '../../utils/default-repository';

@Component({
  selector: 'app-repository-display',
  templateUrl: './repository-display.component.html',
  styleUrls: ['./repository-display.component.scss'],
})
export class RepositoryDisplayComponent {
  @Input()
  currentRepository: Repository = defaultRepository;
  constructor() {}
}
