export const userData = {
  name: 'Roman Reshetnyak',
  email: 'temp84g@gmail.com',
  avatar: 'https://pp.userapi.com/c837435/v837435014/b53/kBHVuapaMBo.jpg'
}

export const inboxData = {
  unread: 3,
  folders: ['Projects', 'Personal']
}

export const draftData = {
  drafts: 10
}

export const emailListData = {
  emaillist: [
    {
      emailId: 1,
      isUnreaded: true,
      from: [{email: 'roman@mail.ru', name: 'Roman Reshetnyak' }],
      avatar: 'https://pp.userapi.com/c837435/v837435014/b53/kBHVuapaMBo.jpg',
      // get avatarText () { return this.fromName.toUpperCase().split(' ').map(name => name[0]).join('') },
      subject: 'московский жетон',
      snippet: '1. Правление в субботу утвердило возможность проведения жетона.',
      receivingDate: new Date(Date.now()).toLocaleString('ru-RU', { month: 'short', day: 'numeric' }),
      attachments: true
    },
    {
      emailId: 2,
      from: [{email: 'sveta@gmail.ru', name: 'Sveta Matveeva' }],
      isUnreaded: true,
      avatar: 'https://pp.userapi.com/c630631/v630631497/11c2c/IxAuEp_jTtk.jpg',
      // get avatarText () { return this.fromName.toUpperCase().split(' ').map(name => name[0]).join('') },
      subject: '[Ticket ID: 298194] Исчезли настройки для внесения "alt"- подписи к картинкам в Галереях',
      snippet: 'Роман, по вашему вопросу была поставлена задача разработчикам, по доработке функционала который позволит добавлять теги Alt',
      receivingDate: new Date(Date.now()).toLocaleString('ru-RU', { month: 'short', day: 'numeric' }),
      attachments: false
    },
    {
      emailId: 3,
      from: [{email: 'vasya@gmail.com', name: 'Игорь Сон' }],
      isUnreaded: false,
      avatar: '',
      // get avatarText () { return this.fromName.toUpperCase().split(' ').map(name => name[0]).join('') },
      subject: 'Летние сборы в Караколе. Газ.',
      snippet: 'Пришлите мне приблизительно количество баллонов газа',
      receivingDate: new Date(Date.now()).toLocaleString('ru-RU', { month: 'short', day: 'numeric' }),
      attachments: false
    },
    {
      emailId: 4,
      from: [{email: 'petya@yandex.ru', name: 'Медведь'}],
      isUnreaded: false,
      avatar: 'https://pp.userapi.com/c841528/v841528829/186c0/RrcZWqWFgwk.jpg',
      // get avatarText () { return this.fromName.toUpperCase().split(' ').map(name => name[0]).join('') },
      subject: 'Проведи лето с Технопарком!',
      snippet: 'Поздравляем всех с завершением сессии и приглашаем провести это лето вместе с Технопарком!',
      receivingDate: new Date(Date.now()).toLocaleString('ru-RU', { month: 'short', day: 'numeric' }),
      attachments: true
    },
    {
      emailId: 5,
      from: [{email: 'test@yandex.ru', name: '' }],
      isUnreaded: false,
      avatar: 'https://pp.userapi.com/c408627/v408627945/70b9/es000t4w1l8.jpg',
      // get avatarText () { return this.fromName.toUpperCase().split(' ').map(name => name[0]).join('') },
      subject: 'Someone has responded to a conversation on Recursive Digit Sum',
      snippet: 'Hi Roman Reshetnyak',
      receivingDate: new Date(Date.now()).toLocaleString('ru-RU', { month: 'short', day: 'numeric' }),
      attachments: false
    }
  ]
}

export const emailData = {
  emailId: 1,
  from: [{email: 'roman@mail.ru', name: 'Roman Reshetnyak'}],
  cc: [
    {email: 'petya@yandex.ru', name: 'Petya Petrov'},
    {email: 'vasy_loh@yandex.ru', name: 'Вася Васин'},
    {email: 'vasy2_loh@yandex.ru', name: ''}
  ],
  to: [
    {email: 'petya@yandex.ru', name: 'Иван Гомель'},
    {email: 'vasy_loh@yandex.ru', name: 'Fedor Bondarchuk'},
    {email: 'vasy2_loh@yandex.ru', name: ''}
  ],
  avatar: 'https://pp.userapi.com/c837435/v837435014/b53/kBHVuapaMBo.jpg',
  // get avatarText () { return this.fromName.toUpperCase().split(' ').map(name => name[0]).join('') },
  subject: 'московский жетон',
  body: '<div><b style="color:red">1.</b> Правление в <i>субботу</i> утвердило возможность проведения жетона.</div>',
  receivingDate: new Date(Date.now()),
  attachments: [{name: 'file very long name very vary.xls', file: 'file1', size: 102412}, {name: 'file.pdf', file: 'file2', size: 50300999}]
}
