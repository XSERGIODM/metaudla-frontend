import { Component, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.css'
})
export class Loader implements OnDestroy {
  emojis = ['🙎‍♂️', '🏝️', '✍️', '🧠', '🌴', '🏖️', '📝', '💭', '🧑‍💻', '🌊', '🐚', '🦜', '🍹', '☀️', '🏄‍♂️', '📖', '🎨', '🧩', '🔍', '💡', '🛟', '🗺️', '📚', '🧠', '💭', '✨', '🌟', '🎯', '🚀', '💻'];
  currentEmoji = signal(this.emojis[0]);
  private intervalId: any;

  constructor() {
    this.intervalId = setInterval(() => {
      const currentIndex = this.emojis.indexOf(this.currentEmoji());
      this.currentEmoji.set(this.emojis[(currentIndex + 1) % this.emojis.length]);
    }, 300);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
