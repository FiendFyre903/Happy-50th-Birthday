# Message Examples and Formats

This file shows examples of different message types and how to format them in `messages.json`.

## Simple Text Message

```json
{
  "name": "John Smith",
  "category": "friends",
  "type": "text",
  "text": "Happy 50th Birthday! Wishing you an amazing day filled with joy, laughter, and all your favorite things. Cheers to 50 wonderful years!"
}
```

## Photo with Caption

```json
{
  "name": "Sarah Johnson",
  "category": "family",
  "type": "photo",
  "text": "Here's a favorite photo from our family vacation! Happy Birthday!",
  "photo": "assets/images/family-photo.jpg"
}
```

## Video Message

```json
{
  "name": "Mike Chen",
  "category": "friends",
  "type": "video",
  "text": "A special video message for your 50th birthday!",
  "video": "assets/videos/mike-birthday-message.mp4"
}
```

## Video Message with Photo Thumbnail

```json
{
  "name": "Linda Davis",
  "category": "family",
  "type": "video",
  "text": "Video message from the family",
  "photo": "assets/images/linda-thumbnail.jpg",
  "video": "assets/videos/linda-message.mp4"
}
```

## Multi-line Text Message

```json
{
  "name": "Robert Anderson",
  "category": "family",
  "type": "text",
  "text": "Dear Sambit,\n\nOn your 50th birthday, I want to express how much you mean to our family.\n\nYour kindness, wisdom, and love have shaped our lives in countless ways. \n\nHere's to celebrating this milestone and many more joyful years ahead!\n\nWith love and gratitude,\nRobert"
}
```

## All Supported Categories

- `"family"` - Family members (appears in featured section)
- `"friends"` - Friends (appears with all messages)

## All Supported Message Types

- `"text"` - Text-only message (requires: `name`, `category`, `type`, `text`)
- `"photo"` - Photo with optional caption (requires: `name`, `category`, `type`, `photo`; optional: `text`)
- `"video"` - Video message (requires: `name`, `category`, `type`, `video`; optional: `text`, `photo` for thumbnail)

## Key Points

1. **Always use double quotes** for JSON keys and string values
2. **Escape special characters** - Use `\"` for quotes within text, `\n` for line breaks
3. **File paths** - Use forward slashes: `assets/images/photo.jpg`
4. **URLs** - You can use external image/video URLs directly from Unsplash, YouTube, etc.
5. **Each message must have** - `name`, `category`, `type`, and at least one content field

## Multiline Text Example

For longer messages, use `\n` for line breaks:

```json
"text": "Line 1\nLine 2\nLine 3"
```

Or in JavaScript/code, use actual line breaks within the string (when editing):

```json
"text": "Line 1
Line 2
Line 3"
```

## Special Occasions - Themed Messages

### Anniversary Tribute
```json
{
  "name": "Life Partner",
  "category": "family",
  "type": "text",
  "text": "Fifty years with you - and every single day has been a blessing. Happy Anniversary on your 50th Birthday!"
}
```

### Legacy Message
```json
{
  "name": "Child",
  "category": "family",
  "type": "text",
  "text": "Thank you for 50 years of guidance, love, and endless support. You've shown us what it means to live with integrity and kindness. Happy Birthday to the best parent!"
}
```

### Friendship Milestone
```json
{
  "name": "Best Friend",
  "category": "friends",
  "type": "text",
  "text": "Fifty years ago, you came into this world and made it infinitely better. Thank you for three decades of friendship. Here's to many more!"
}
```

## Tips for Great Messages

1. **Keep it Personal** - Reference shared memories or inside jokes
2. **Be Authentic** - Let genuine emotion shine through
3. **Mix Humor and Sentiment** - Balance is key
4. **Keep It Concise** - 50-200 words is ideal (preview shows first 100 characters)
5. **Encourage Video** - Video messages are especially impactful
6. **Include Details** - Specific memories or qualities are touching

## Video Message Tips

1. **Format**: MP4 is most compatible (works on all browsers)
2. **Size**: Try to keep under 50MB for faster loading
3. **Length**: 30 seconds to 2 minutes is ideal
4. **Quality**: 720p or higher looks professional
5. **Tools**: Use QuickTime (Mac), Photos app (Windows), or OBS (free)

---

Feel free to customize these examples for your specific needs!
