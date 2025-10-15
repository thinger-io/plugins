import { Routes } from '@angular/router';
import { McpComponent } from './features/mcp/mcp.component';

export const routes: Routes = [
  { path: '', redirectTo: 'mcp', pathMatch: 'full' },
  { path: 'mcp', component: McpComponent },
];
