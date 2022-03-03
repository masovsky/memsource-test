package memsource.controller;

import javax.validation.Valid;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

import memsource.model.Setting;
import memsource.repository.SettingRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
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
    public ResponseEntity<Setting> saveSetting(@Valid @RequestBody Setting setting) throws URISyntaxException {
        Setting savedSetting = settingRepository.save(setting);
        return ResponseEntity.ok(savedSetting);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({MethodArgumentNotValidException.class})
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
