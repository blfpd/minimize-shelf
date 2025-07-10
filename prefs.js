import GObject from 'gi://GObject';
import Gtk from 'gi://Gtk';
import Adw from 'gi://Adw';

import {ExtensionPreferences} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

import {Direction} from './utils/settings.js';

const _toggle_direction = widget => {
    if (widget.get_active()) Side.save(Side[widget.label]);
};

let Side;

const PrefsWidget = GObject.registerClass(
    class PrefsWidget extends Gtk.Box {
        _init({ margin_top, margin_side }) {
            super._init();
            this.set_homogeneous(true);
            this.set_spacing(12);
            this.set_margin_top(margin_top);
            this.set_margin_bottom(margin_top);
            this.set_margin_start(margin_side);
            this.set_margin_end(margin_side);

            const label = new Gtk.Label({ label: 'Panel side' });
            const TOGGLES = {
                [Side.Left]: Gtk.ToggleButton.new_with_label(
                    Side.label(Side.Left)
                ),
                [Side.Right]: Gtk.ToggleButton.new_with_label(
                    Side.label(Side.Right)
                ),
            };

            TOGGLES[Side.Left].connect('toggled', _toggle_direction);
            TOGGLES[Side.Right].connect('toggled', _toggle_direction);
            TOGGLES[Side.Right].set_group(TOGGLES[Side.Left]);

            TOGGLES[Side.value].set_active(true);

            this.append(label);
            this.append(TOGGLES[Side.Left]);
            this.append(TOGGLES[Side.Right]);
        }
    }
);

export default class MinimizeShelfPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        Side = new Direction(this.getSettings()).load();
        
        const page = new Adw.PreferencesPage();
        const group = new Adw.PreferencesGroup();
        
        const prefsWidget = new PrefsWidget({ margin_top: 200, margin_side: 160 });
        group.add(prefsWidget);
        page.add(group);
        window.add(page);
    }
}
