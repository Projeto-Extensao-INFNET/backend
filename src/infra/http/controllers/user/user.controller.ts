import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { UserService } from '@Services/user/user.service';

import { Roles } from '@/infra/auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../auth/guards/auth.guard';

import { MAX_FILE_SIZE } from '@/shared/constants';

import { successResponse } from '@/shared/errors/responses/success.response';
import { handleError } from '@/shared/errors/handleError';

import { AuthenticatedUserResponse } from '@/infra/http/dtos/auth/auth-user';
import { DeleteProfileResponseDto } from '../../dtos/user/delete-profile.dto';
import { EditProfileDto } from '../../dtos/user/edit-profile.dto';
import { GetUserProfileResponse } from '../../dtos/user/get-user.dto';

import type { RequestResponse } from '@/shared/errors/responses';
import type {
  PaginationQueryDto,
  PaginationResultDto,
} from '../../dtos/pagination/pagination.dto';
import type { UserModel } from '@/domain/models/user.model';
import type { ROLE } from '@/shared/types';

@Controller('/accounts')
@ApiTags('Accounts')
@ApiBearerAuth('authorization')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Roles('ADMIN' as ROLE)
  @Get('users')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiOperation({ summary: 'Get all users', operationId: 'listUsers' })
  @ApiResponse({ status: 200, description: 'List of users (paginated)' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas!' })
  @ApiResponse({ status: 404, description: 'Recurso não encontrado!' })
  async getAllUsers(
    @Query() query: PaginationQueryDto,
  ): Promise<
    RequestResponse<PaginationResultDto<Omit<UserModel, 'password'>>>
  > {
    const result = await this.service.getUsers(query);
    if (!result.ok) return handleError(result.error);

    return successResponse(result.value, HttpStatus.OK);
  }

  @Post('me/avatar')
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN', 'PATIENT', 'PROFESSIONAL' as ROLE)
  @UseInterceptors(FileInterceptor('avatar'))
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Upload avatar for authenticated user',
    operationId: 'uploadUserAvatar',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Avatar file to upload (JPEG, PNG, JPG)',
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
          description: 'Avatar image file',
        },
      },
      required: ['avatar'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Avatar uploaded successfully',
  })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas!' })
  @ApiResponse({
    status: 422,
    description: 'Unprocessable entity - file validation failed',
  })
  @ApiResponse({ status: 404, description: 'Recurso não encontrado!' })
  async exec(
    @Req() req: AuthenticatedUserResponse,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'jpeg|png|jpg' })
        .addMaxSizeValidator({ maxSize: MAX_FILE_SIZE })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ): Promise<RequestResponse<string>> {
    const result = await this.service.uploadAvatar(req, file);
    if (!result.ok) handleError(result.error);
    return successResponse('Sucesso ao enviar imagem', HttpStatus.OK);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user profile', operationId: 'getUserProfile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    type: GetUserProfileResponse,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'RESOURCE_NOT_FOUND' })
  async getUserProfile(
    @Req() req: AuthenticatedUserResponse,
  ): Promise<RequestResponse<GetUserProfileResponse>> {
    const userId = req.user.sub;

    const result = await this.service.getProfile(userId);
    if (!result.ok) return handleError(result.error);

    return successResponse(result.value, HttpStatus.OK);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Edit authenticated user profile',
    operationId: 'updateUserProfile',
  })
  @ApiBody({ description: 'User profile data to update', type: EditProfileDto })
  @ApiResponse({
    status: 200,
    description: 'Profile updated successfully',
    type: GetUserProfileResponse,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async editProfile(
    @Req() req: AuthenticatedUserResponse,
    @Body() dto: EditProfileDto,
  ): Promise<RequestResponse<EditProfileDto>> {
    const userId = req.user.sub;

    const result = await this.service.editProfile(userId, dto);
    if (!result.ok) return handleError(result.error);

    return successResponse(result.value);
  }

  @Delete('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete user profile',
    operationId: 'deleteProfile',
  })
  @ApiResponse({
    status: 204,
    description: 'User account deleted successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 204 },
        message: { type: 'string', example: 'Usuário removido com sucesso!' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deleteUserProfile(
    @Req() req: AuthenticatedUserResponse,
  ): Promise<RequestResponse<DeleteProfileResponseDto>> {
    const result = await this.service.deleteProfile(req.user.sub);
    if (!result.ok) handleError(result.error);

    return successResponse(
      { message: 'Perfil removido com sucesso!' },
      HttpStatus.OK,
    );
  }
}
