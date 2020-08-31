import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
//import { timeStamp } from 'console';

@Entity()
export class ChatBot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  type: string;

  @Column({ default: 'active' })
  status: string;

  // @Column()
  // createdTimeStamp: Timestamp; 

  // @Column()
  // modifyTimeStamp: Timestamp; 
}
