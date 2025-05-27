import { Column, Entity } from 'typeorm';

@Entity('user')
export class UserEntity {
  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 255 })
  fullName: string;
}
