package memsource.controller;

import java.net.URISyntaxException;

import memsource.model.Setting;
import memsource.repository.SettingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/setting")
public class SettingsController {

    private final SettingRepository settingRepository;

    public SettingsController(SettingRepository settingRepository) {
        this.settingRepository = settingRepository;
    }

    @GetMapping("read")
    public Setting read() {
        return settingRepository.findById(Setting.SETTING_ID).orElse(new Setting());
    }

    @PostMapping("save")
    public ResponseEntity<Setting> saveSetting(@RequestBody Setting setting) throws URISyntaxException {
        Setting savedSetting = settingRepository.save(setting);
        return ResponseEntity.ok(savedSetting);
    }
}
