import { Routes } from '@angular/router';
import { McpComponent } from './features/mcp/mcp.component';

export const routes: Routes = [
  { path: '', component: McpComponent },
  { path: '**', redirectTo: '' }
];
