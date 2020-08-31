import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
//import { timeStamp } from 'console';

@Entity()
export class ManageChatBot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quesId: number;

  @Column()
  ansId: number;

  @Column({ default: 'active' })
  status: string;
}
