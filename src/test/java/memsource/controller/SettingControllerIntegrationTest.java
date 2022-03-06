package memsource.controller;

import memsource.MemsourceApplication;
import memsource.model.Setting;
import memsource.repository.SettingRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.hamcrest.CoreMatchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT, classes = MemsourceApplication.class)
@AutoConfigureMockMvc
@EnableAutoConfiguration(exclude = SecurityAutoConfiguration.class)
@AutoConfigureTestDatabase
public class SettingControllerIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private SettingRepository repository;

    @AfterEach
    public void resetDb() {
        repository.deleteAll();
    }

    @Test
    public void readEmptySetting() throws Exception {
        mvc.perform(get("/setting/read"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("name", is("")))
                .andExpect(jsonPath("password", is("")));
    }

    @Test
    public void readSetting() throws Exception {
        createSettingInDb();
        mvc.perform(get("/setting/read"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("name", is("name")))
                .andExpect(jsonPath("password", is("password")));
    }

    @Test
    public void saveSetting() throws Exception {
        Assertions.assertNull(repository.findById(Setting.SETTING_ID).orElse(null));
        Setting setting = new Setting();
        setting.setName("name");
        setting.setPassword("password");
        mvc.perform(post("/setting/save")
                .contentType(MediaType.APPLICATION_JSON)
                .content(JsonUtil.toJson(setting)))
                .andExpect(status().isOk());
        Setting savedSetting = repository.findById(Setting.SETTING_ID)
                .orElseThrow(() -> new AssertionError("Missing setting"));
        Assertions.assertEquals(setting, savedSetting);
    }

    @Test
    public void updateSetting() throws Exception {
        createSettingInDb();
        processSave("new name", "new password", result -> result.andExpect(status().isOk()));
        Setting settingUpdate = new Setting();
        settingUpdate.setName("new name");
        settingUpdate.setPassword("new password");
        Assertions.assertEquals(settingUpdate, repository.findById(Setting.SETTING_ID).orElse(null));
    }

    @Test
    public void saveFailWithEmptyName() throws Exception {
        processSave("", "password",
                result -> result
                        .andExpect(status().is(400))
                        .andExpect(jsonPath("name", is("name.empty")))
        );
        Assertions.assertNull(repository.findById(Setting.SETTING_ID).orElse(null));
    }

    @Test
    public void saveFailWithTooLengthName() throws Exception {
        processSave(new String(new char[129]).replace('\0', 'x'), "password",
                result -> result
                        .andExpect(status().is(400))
                        .andExpect(jsonPath("name", is("name.max")))
        );
        Assertions.assertNull(repository.findById(Setting.SETTING_ID).orElse(null));
    }

    @Test
    public void saveFailWithTooLengthPassword() throws Exception {
        processSave("name", new String(new char[257]).replace('\0', 'x'),
                result -> result
                        .andExpect(status().is(400))
                        .andExpect(jsonPath("password", is("password.max")))
        );
        Assertions.assertNull(repository.findById(Setting.SETTING_ID).orElse(null));
    }

    @Test
    public void saveFailWithEmptyPassword() throws Exception {
        processSave("name", "",
                result -> result
                        .andExpect(status().is(400))
                        .andExpect(jsonPath("password", is("password.empty")))
        );
        Assertions.assertNull(repository.findById(Setting.SETTING_ID).orElse(null));
    }

    private void processSave(String name, String password, CheckedFunction<ResultActions> checker) throws Exception {
        Setting settingToSave = new Setting();
        settingToSave.setName(name);
        settingToSave.setPassword(password);
        ResultActions resultActions = mvc.perform(post("/setting/save")
                .contentType(MediaType.APPLICATION_JSON)
                .content(JsonUtil.toJson(settingToSave)))
                .andDo(print());
        checker.check(resultActions);
    }

    private void createSettingInDb() {
        Setting setting = testSetting();
        repository.save(setting);
    }

    private Setting testSetting() {
        Setting setting = new Setting();
        setting.setName("name");
        setting.setPassword("password");
        return setting;
    }

    @FunctionalInterface
    public interface CheckedFunction<T> {
        void check(T t) throws Exception;
    }
}
