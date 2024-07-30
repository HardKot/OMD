/** Сущность подписки которая возвращается с сервера */
export interface Subscribe {
	/** Идентификатор пользователя, которому принадлежит подписка информация которой получена */
	readonly UserId: string;
	/** Дата оформления подписки */
	readonly WhenSubscribe: string;
	/** Оставшиеся время действия подписки */
	readonly RemainingTime: number | string;
	/** Тип оформляемой подписки */
	readonly Type: "Week" | "Month" | "Month6";
	/** Id автоплатежа */
	readonly RebillId: number;
}