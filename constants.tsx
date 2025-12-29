
import { Category, ResourceItem } from './types';

export const INITIAL_ITEMS: ResourceItem[] = [
  {
    id: 'after-effects',
    title: 'After Effects',
    description: 'Motion graphics and visual effects industry standard.',
    category: Category.SOFTWARE,
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg',
    versions: [
      { name: '2025 Latest', url: 'https://drive.google.com/file/d/1QF0AHW52ZDpfHqLLIZ4hUSqHHy0Q30ZQ/view?usp=sharing' },
      { name: '2024 Stable', url: 'https://drive.google.com/file/d/11hAL0WdA77ewKd4iJeGDi1AzViUTtlEM/view?usp=sharing' }
    ]
  },
  {
    id: 'easy-workflow',
    title: 'Easy Workflow',
    description: 'Boost your productivity with Easy Workflow, the ultimate script designed to automate repetitive tasks and simplify your editing process in After Effects.',
    category: Category.SCRIPTS,
    image: 'https://picsum.photos/seed/workflow/400/250',
    isFeatured: true,
    versions: [
      { name: 'v2.4.0', url: 'https://drive.google.com/drive/folders/1dy6ocj1L3utW2AxrQ_kJa8-ikIzyVALw?usp=sharing' }
    ]
  },
  {
    id: 'mocha-pro',
    title: 'Mocha Pro',
    description: 'World-renowned planar motion tracking and rotoscoping.',
    category: Category.PLUGINS,
    image: 'https://picsum.photos/seed/mocha/200/200',
    versions: [
      { name: 'Mocha Pro 2025', url: '#' }
    ]
  },
  {
    id: 'sapphire-suite',
    title: 'Sapphire Suite',
    description: 'Essential collection of powerful plugins for visual effects.',
    category: Category.PLUGINS,
    image: 'https://picsum.photos/seed/sapphire/200/200',
    versions: [
      { name: 'Sapphire 2026', url: '#' }
    ]
  }
];
