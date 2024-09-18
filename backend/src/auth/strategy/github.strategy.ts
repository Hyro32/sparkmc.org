import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      clientID: config.get('GITHUB_CLIENT_ID'),
      clientSecret: config.get('GITHUB_CLIENT_SECRET'),
      callbackURL: config.get('GITHUB_CALLBACK_URL'),
      scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err: any, user: any) => void,
  ): Promise<void> {
    let user = await this.usersService.findOneByGithubId(profile.id);

    if (user) return done(null, user);

    const usernameTaken = await this.usersService.findOneByUsername(
      profile.username,
    );

    if (usernameTaken) {
      profile.username = await this.usersService.generateUniqueUsername(
        profile.username,
      );
    }

    user = await this.usersService.create({
      email: profile.emails[0].value,
      username: profile.username,
      githubId: profile.id,
      avatar: profile.photos[0].value,
    });

    return done(null, user);
  }
}
