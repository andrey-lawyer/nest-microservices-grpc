import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Observable, Subject } from 'rxjs';

import {
  User,
  Users,
  CreateUserDto,
  UpdateUserDto,
  PaginationDto,
} from '@app/common';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly users: User[] = [];

  onModuleInit() {
    for (let i = 0; i <= 100; i++) {
      this.create({
        username: randomUUID(),
        password: randomUUID(),
        age: 0,
      });
    }
  }
  create(createUserDto: CreateUserDto) {
    const user: User = {
      ...createUserDto,
      subscribed: false,
      socialMedia: {},
      id: randomUUID(),
    };
    this.users.push(user);
    return user;
  }

  findAll(): Users {
    return { users: this.users };
  }

  findOne(id: string): User {
    const user: User = this.users.find((user) => id === user.id);
    return user;
  }

  update(updateUserDto: UpdateUserDto): User {
    const userIndex = this.users.findIndex(
      (user) => user.id === updateUserDto.id,
    );
    if (userIndex !== -1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...updateUserDto,
      };
      return this.users[userIndex];
    }
    throw new NotFoundException(`User not found by id ${updateUserDto.id}.`);
  }

  remove(id: string): User {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      return this.users.splice(userIndex)[0];
    }
    throw new NotFoundException(`User not found by id ${id}.`);
  }

  queryUsers(
    paginationDtoStream: Observable<PaginationDto>,
  ): Observable<Users> {
    // Создаем новый Subject, который будет использоваться для отправки пользователей
    const subject = new Subject<Users>();

    // Функция onNext будет вызываться при получении нового объекта PaginationDto
    const onNext = (paginationDto: PaginationDto) => {
      // Вычисляем начальный индекс для выборки пользователей с учетом пагинации
      const start = paginationDto.page * paginationDto.skip;
      // Отправляем только нужную часть пользователей с помощью метода slice
      subject.next({
        users: this.users.slice(start, start + paginationDto.skip),
      });
    };

    // Функция onComplete будет вызываться, когда стрим PaginationDto завершится
    const onComplete = () => subject.complete();

    // Подписываемся на стрим PaginationDto
    paginationDtoStream.subscribe({
      next: onNext,
      complete: onComplete,
    });

    // Возвращаем Observable, который будет отправлять пользователей по мере получения запросов пагинации
    return subject.asObservable();
  }
}
