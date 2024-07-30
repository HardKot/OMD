/** Сущность Пользователя которая возвращается с сервера */
export interface User {
	/** Уникальный идентификатор пользователя в Firebase */
	readonly Id: string;
	/** Уникальное имя пользователя */
	readonly NickName: string;
	/** Дата рождения пользователя */
	readonly Birthday: string;
	/**	Отображаемое имя пользователя */
	readonly DisplayName?: string;
	/** Сообщение пользователя, которое он оставил на своей странице */
	readonly Status?: string;
	/** Название к какой группе относится пользователь */
	readonly Role: "ADMIN" | "USER";
	/** Пол пользователя который он указал */
	readonly Gender: "MALE" | "FEMALE" | "OTHER";
	/** Категория к деятельности пользователя, которую он указал */
	readonly Category: "NULL"
		| "BLOGGER"
		| "COMMUNITY"
		| "ORGANIZATION"
		| "EDITOR"
		| "WRITER"
		| "GARDENER"
		| "FLOWER_MAN"
		| "PHOTOGRAPHER";
	/** Дата регистрации пользователя */
	readonly DateTimeRegistration: string;
	/** Есть ли у пользователя изображение профиля */
	readonly PhotoId?: string;
	/** Есть ли у пользователя подписка */
	readonly IsSubscribe: boolean;
}