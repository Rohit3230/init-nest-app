import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
