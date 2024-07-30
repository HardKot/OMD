import React from "react";
import { FC, forwardRef, PropsWithChildren } from 'react';

export const ViewModel = <Props, HookMethods, IRef = {}>(
	useComponent: (props: Props) => HookMethods,
	Component: FC<Props & HookMethods & PropsWithChildren>
) =>
	forwardRef<IRef, Props>(function (props, ref) {
		const hookMethods = useComponent(props);
		return <Component {...props} {...hookMethods} ref={ref} />;
	});
