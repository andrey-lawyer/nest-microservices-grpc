import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'json', nullable: true })
  socialMedia: {
    twitterUri?: string;
    fbUri?: string;
  };
}
