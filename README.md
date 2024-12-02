# hi-shortcut

The ShortCut class is designed to simplify the process of creating keyboard shortcuts in web applications. It allows you to define custom key combinations and associate actions with them.

## Install 

```
npm install hi-shortcut
```

Class Methods:
    
    listen(shortcut_name, key, callback):
        Adds a listener for a single key combination.
        Triggers the specified action when the combination is detected.

    listenMulti(shortcut_name, key, callback):
        Adds a listener for multiple key combinations.
        Triggers the specified action when the full combination is detected.

    remove(shortcut_name):
        Removes a specific listener.

## Example Usage:

```JS
// import
import {ShortCut} from 'hi-shortcut'

const shortcut = new ShortCut('alt')

shortcut.listen('new_user', 'n',()=>{
  // alt + n
})

shortcut.listen('remove_user', 'r',()=>{
  // alt + r
})
```

In the above example, the event is triggered when the user presses the alt and n or alt and r keys at the same time.
But you can also use multiple key combinations like the code below.

```JS
shortcut.listenMulti('save_info', ['a', 'h', 'j'] ,()=>{
  // alt a + h + j
})
```
The above event is executed when the alt, a, h, and j keys are pressed simultaneously.

Sometimes we may want to consider multiple key combinations for an event. For example, we want the same operation to be performed when the user presses the alt and a key or presses the alt and b keys (multiple similar shortcuts).

```JS
shortcut.listen('new_user', ['a','b','ش'],()=>{
  // alt + a or alt + b or alt + ش
})

shortcut.listenMulti('remove_user', [ ['a','ش'], ['b', 'ذ']] ,()=>{
  // alt + (a or ش) + (b or ذ)
})
```
The above event is triggered when the alt key is pressed with a or alt with b or alt with ش.
This feature is especially useful for users who use multiple keyboards, who can customize their events for other keyboards and languages.

To remove and disable a shortcut, you can use the `remove` method:

```JS

shortcut.remove('shortcut_name')
```
