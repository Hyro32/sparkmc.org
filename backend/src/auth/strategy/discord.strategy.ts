import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      clientID: config.get('DISCORD_CLIENT_ID'),
      clientSecret: config.get('DISCORD_CLIENT_SECRET'),
      callbackURL: config.get('DISCORD_CALLBACK_URL'),
      scope: ['identify', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err: any, user: any) => void,
  ) {
    let user = await this.usersService.findOneByDiscordId(profile.id);

    if (user) return done(null, user);

    const usernameTaken = await this.usersService.findOne(profile.username);

    if (usernameTaken) {
      profile.username = await this.usersService.generateUniqueUsername(
        profile.username,
      );
    }

    user = await this.usersService.create({
      email: profile.email,
      username: profile.username,
      discordId: profile.id,
      avatar: profile.avatar,
    });

    return done(null, user);
  }
}
