export function getAdminData()
{
	return [
		{
			name: "Console",
			slug: "console",
			handler: "myConsole",
			args: ["console"],
			icon: "fas fa-wrench",
			children:[ ],
			children2:[ ],
		},
		{	
			name: "My Projects",
			slug: "myProjects",
			handler: "myProjectsHandler",
			args:['myProjects'],
			icon: "fas fa-bomb",
			children:[ ],
			children2:[ ],
			children3:[
				{
					name: "Create",
					name2: "Create",
					slug: "create",
					handler: "createProjectHandler",
					icon: "fas fa-plus",
					args:['create'],
					children:[]
				}
			],
		},
		{
			name: "My Profile",
			slug: "myRoles",
			handler: "myRolesHandler", 
			args: ['myRoles'],
			icon: "fas fa-user-tie",
			children: [ ],
			children2: [ ]
		}
	];//admin_panel.slice(0);
}

/*
*	data = { name, slug, parentSlug, handler, args }
*/
export function update_admin_panel( data=-1 )
{
	var dd =  getAdminData().slice(0);
	console.log( getAdminData() );
	/*
	 getAdminData().forEach((elem, num, ap) =>
	{
		dd[num] = elem;
		if( data.parentSlug === elem.slug )
		{
			var child = data.child === 2 ? dd[num].children2 : dd[num].children;
			child.push({
				name: data.name, 
				slug: data.slug,
				handler: data.handler,
				icon: data.icon,
				args: data.args,
				children: []
			});
		}
	});
	*/
	for(var num = 0; num < dd.length; num++)
	{
		//dd[num] 			= Object.assign({},  getAdminData()[num]);
		if( data.parentSlug === dd[num].slug )
		{
			var child = data.child === 2 ? dd[num].children2 : dd[num].children;
			child.push({
				name: data.name, 
				slug: data.slug,
				handler: data.handler,
				icon: data.icon,
				args: data.args,
				children : [],
				children2: []
				
			});
		}
	}
	
	return dd;
}