import { Controller, UseGuards } from '@nestjs/common'
import { AdminGuard } from '../../auth/guards/admin.guard'
import { ContentService } from '../services/content.service'

@UseGuards(AdminGuard)
@Controller('/admins/contents')
export class ContentAdminController {
  constructor(private contentService: ContentService) {}

  create() {}

  findAll() {}

  findByID() {}

  update() {}

  remove() {}
}
