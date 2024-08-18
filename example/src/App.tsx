import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const Button = ({
	title,
	style = {},
	textStyle = {},
	onPress
}: {
	title: string;
	style: any;
	textStyle: any;
	onPress: () => void;
}) => {
	return (
		<TouchableOpacity style={style} onPress={onPress}>
			<Text style={textStyle}>{title}</Text>
		</TouchableOpacity>
	);
};

export const App = () => {
	return (
		<View style={styles.container}>
			<Button
				textStyle={styles.textStyle}
				style={styles.button}
				title="Request Location While Using"
				onPress={async () => {}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	button: {
		backgroundColor: 'black',
		width: 300,
		height: 50,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 10
	},
	textStyle: {
		color: 'white',
		fontSize: 18,
		fontWeight: '500'
	}
});
