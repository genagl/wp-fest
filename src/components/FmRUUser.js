import React, {Component} from 'react';
import Vocabulary from './Vocabulary';

export default class FmRUUser extends Component
{	
	static _roles = [
		{
			slug:'administrator', 
			role:"administrator",
			descr:"<b>Администратор</b>."
		}, 
		{
			slug:'Expert', 
			role:"expert",
			descr:"Вы - <b>Эксперт</b>. "
		
		}, 
		{
			slug:'Tutor', 
			role:"tutor_id",
			descr:"Вы - <b>Наставник</b>. Этот статус дает Вам возможность сопровождать Проекты, управлять ими от имени Лидерва (не надо этими злоупотреблть до тех пор, пока Лидер и команда проекта активны)"
		
		}, 
		{
			slug:'Project_author', 
			role:"leader_id",
			descr:"Статус <b>Лидера</b> дaёт Вам возможность создавать новый Проект, набрать команду и Наставника"
		
		}, 
		{
			slug:'Project_member', 
			role:"member_0",
			descr:"Как <b>Участник</b> Вы можете:<ul><li></li></ul>"
		
		}, 
		{
			slug:'contributor', 
			role:"contributor",
			descr:"Как  <b>наблюдатель</b> Вы можете:<ul><li>Посмотреть описание любого Проекта</li><li>Читать журналы Проектов</li><li>Посмотреть журнал оценок Экспертами любого Проекта</li><li>Зарегистрироваться в статусе участника программы и создавать/участвовать в Проектах</li><li>Зарегистрироваться в статусе Эксперта и оценивать Проекты</li></ul>Для рeгистрации обратитесь к Руководству Программы."
		
		}
	];
	static roles = FmRUUser._roles.map((elem, num) => {
		return elem.slug;
	});
	static getSlug(role)
	{
		switch(role)
		{
			case "member_0":
			case "member_1":
			case "member_2":
			case "member_3":
			case "member_4":
			case "member_5":
			case "member_6":
			case "member_7":
			case "member_8":
			case "member_9":
				return "Member";
			default:
				//return role; 
				return FmRUUser._roles.filter(elem => {
					if(elem.role === role) return  elem.slug;
				})[0].slug;
		}
	}
	constructor(props) 
	{
        super(props);
        this.state = 
		{
			roles: props.roles,
			name: props.name,
			id: props.user_id,
			is_expert: props.is_expert
		}
	}
	render()
	{
		return "";
	}
	static rolesBlock()
	{
		return FmRUUser.instance.props.roles.map((e, i) => <div key={i} className="d-inline-block text-dark bg-half-transparent m-1 px-2 py-1 little">
			{Vocabulary.getText(e)}
		</div>);
	}
	static is_role( role )
	{
		return FmRUUser.instance.props.roles.in_array( role ) ? 1 : 0;
	}
	static bySlug(slug)
	{
		return FmRUUser._roles.filter((elem, num) =>
		{
			return slug === elem.slug;
		})
	}
}