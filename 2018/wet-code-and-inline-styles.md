---
date: 2018-04-02
modified_at: 2018-05-20
tags: [programming, coding, react-native, dx, productivity]
description: A controversial take on coding practices advocating for inline styles and WET code over DRY principles to prioritize development speed and reduce abstraction overhead.
---

# Wet code and inline styles

Maybe I’m a bad coder… but I feel like there are a few principles of coding -
that good coders use a lot – are weird.

The most important is not to create too many layers.

If you use code only in one place… why create a function of it? I see this all
the time and I don’t agree. It makes your code more abstract. You have to look
up piece for piece.

I think it’s better to just write code in the order that it is executed
sometimes. I call it lazy programming. You only create a function of something
if you use it multiple times in your code. Otherwise… don’t!

This is one of the most important things that helps me code quickly. And most
people won’t agree with me… But: keep single features in one place in your code.
Don’t spread a single feature across 3 places in your code. The biggest example
is doing inline styles. I see so many people doing this:

<View style={styles.container}> 
	<Text style={styles.bold}>Vette shit</Text>
	//stuff
</View>

styles = StyleSheet.create({
container: {
	flex: 1
},

bold: {
	fontWeight: ‘bold’
}
});


Sorry, but I’m just doing this:

<View style={{flex:1}}>
	<Text style={{fontWeight:’bold’}}>Vette shit</Text>
</View>


And if I need another line of bold text, I will do this:

<View style={{flex:1}}>
	<Text style={{fontWeight:’bold’}}>Vette shit</Text>
	<Text style={{fontWeight:’bold’}}>Another line</Text>
</View>


Copy fucking paste!

Why?

SPEED.

It doesn’t really make the code worse? If anything it will probably execute
faster.

It doesn’t really hurt my eyes. I’m used to this.

It isn’t harder to understand and it’s easy to see what it does in one blink.

So why would I create a class ‘styles’ that abstracts away the declarativeness
of exactly what it does? Why make it harder for myself? Why why why?

I think that in such cases, it’s better to repeat yourself. DRY? Fuck that, WET!

Even if I repeat myself 5 times, It’s still faster than to create a class that I
have to look up later.

<View style={{flex:1}}>
	<Text style={{fontWeight:’bold’}}>Vette shit</Text>
	<Text style={{fontWeight:’bold’}}>Another line</Text>
	<View style={{flex:1, flexDirection:’row’}}>

<Text style={{fontWeight:’bold’}}>Yet another line</Text>
	<Text style={{fontWeight:’bold’}}>Two more</Text>
	<Text style={{fontWeight:’bold’}}>One moarh….</Text>
	
	</View>
</View>


Some people would despise this. They would write it like this:

<View style={{flex:1}}>
	<Text style={styles.bold}>Vette shit</Text>
	<Text style={styles.bold}>Another line</Text>
	<View style={styles.flexRow}>
<Text style={styles.bold}> Yet another line</Text>
<Text style={styles.bold}> Yet another line</Text>
<Text style={styles.bold}> Yet another line</Text>
	</View>
</View>
const styles = StyleSheet.create({
container: {flex:1},
bold:{fontWeight:’bold’},
flexRow: {flex:1, flexDirection:’row’}
});


But in my opinion this isn’t worth it. What if later you decide that the second
bold line has to be italic too? Then you have to create a different class again,
and change the name. What if your bold text has to be italic? Then you have to
change all the names of the styles otherwise it’s not proper naming? Some people
would say that you should call the style more general then, like
‘highlightedText’ or something. But this is abstracting away and this is
horrible for the amount of brain capacity it takes before you understand it!

So I keep it simple and just use low-level code without any abstractions, as
long as it’s not taking too long to write it down.

Hope you like this post.